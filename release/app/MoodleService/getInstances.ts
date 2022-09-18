import { net } from 'electron';
import { JSDOM } from 'jsdom';
import { MoodleInstance } from './types';

function fetchMoodleStartPage(moodleUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const request = net.request(moodleUrl);
    request.on('response', (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Moodle responded with ${response.statusCode}`));
        return;
      }

      const data = new Array<Buffer>();
      response.on('data', (chunk) => {
        data.push(chunk);
      });

      response.on('end', () => {
        const text = Buffer.concat(data).toString();
        resolve(text);
      });
    });
    request.on('error', (error) => {
      reject(error);
    });
    request.setHeader('Content-Type', 'text/html');
    request.end();
  });
}

function getMoodleInstancesListItems(doc: Document): HTMLElement[] {
  return Array.prototype.slice.call(
    doc.querySelectorAll(
      '#page-content table tr:first-child td:first-child ul li'
    )
  ) as unknown as HTMLElement[];
}

const isNumber = (str: string): boolean => /^[0-9]*$/g.test(str);

const getSemesterSortingWeight = (semester: string) => {
  if (semester === 'Fall') {
    return 1;
  }
  if (semester === 'Summer') {
    return 2;
  }
  // if (semester === 'Spring')
  return 3;
};

export async function getInstances(moodleUrl: string) {
  const startPage = await fetchMoodleStartPage(moodleUrl);
  const jsDom = new JSDOM(startPage);
  const moodleInstancesListItems = getMoodleInstancesListItems(
    jsDom.window.document
  );

  const moodleInstancesBySemester = moodleInstancesListItems.flatMap(
    (option): MoodleInstance[] => {
      // Get the year of this option
      const yearOfInstance = option.textContent
        ?.replaceAll(/\(.*\)/g, '')
        .trim();

      // Filter out all the first links that are duplicates and don't have a year assigned to them
      if (yearOfInstance && isNumber(yearOfInstance)) {
        const aElements = option.getElementsByTagName('a');
        const links = Array.prototype.slice.call(
          aElements
        ) as HTMLLinkElement[];

        // An array of the links to the moodle instances
        return links
          .flatMap((a) => {
            const semester = a.textContent;
            const link = a.getAttribute('href');

            if (link === null || semester === null) {
              return [];
            }

            return {
              label: `${yearOfInstance} ${semester}`,
              semester: semester.trim(),
              link,
            };
          })
          .sort((a, b) => {
            return (
              getSemesterSortingWeight(a.semester) -
              getSemesterSortingWeight(b.semester)
            );
          });
      }

      return [];
    }
  );

  return moodleInstancesBySemester;
}
