
import type { Act } from '../types';

/**
 * This is a model data structure for a new Bare Act file.
 *
 * Each act should be exported as a const of type 'Act'.
 * The structure should follow the interfaces defined in 'src/lib/types.ts'.
 *
 * An Act can have chapters, schedules, or it can have sections directly if there are no chapters/schedules.
 *
 * - act_name: The full name of the act, including the year.
 * - chapters: (Optional) An array of Chapter objects. Use this if the act is divided into chapters.
 *   - chapter_number: The number of the chapter (e.g., "I", "II", "1", "2").
 *   - chapter_title: (Optional) The title of the chapter.
 *   - section_range: (Optional) A string indicating the range of sections (e.g., "1-10").
 *   - sections: An array of Section objects.
 * - schedules: (Optional) An array of Schedule objects. Use this for schedules.
 *   - schedule_number: The number of the schedule (e.g., "First Schedule", "Schedule A").
 *   - schedule_title: (Optional) The title of the schedule.
 *   - sections: An array of Section objects.
 * - sections: (Optional) An array of Section objects. Use this if the act is not divided into chapters or schedules.
 *
 * Section object properties:
 * - section_number: The number of the section (e.g., "1", "1A", "2").
 * - section_title: (Optional) The title of the section.
 * - text: The full, pre-formatted text of the section. Use '\n\n' for paragraph breaks. Tables can be included.
 * - annotations: (Optional) An array of annotations for superscript references in the text.
 * - explanation: (Optional) A simplified explanation or commentary on the section text.
 */
export const templateAct: Act = {
    act_name: "The Example Act, 2024",
    chapters: [
      {
        chapter_number: "I",
        chapter_title: "Preliminary",
        section_range: "1-2",
        sections: [
          {
            section_number: "1",
            section_title: "Short title and commencement",
            text: "(1) This Act may be called the Example Act, 2024.\n\n(2) It shall come into force on such date¹ as the Central Government may, by notification in the Official Gazette, appoint.",
            annotations: [
              { "id": "1", "detail": "Date of commencement notification will be provided later." }
            ],
            explanation: "This section gives the official name of the law and states that it will become active on a date chosen by the Government."
          },
          {
            section_number: "2",
            section_title: "Definitions",
            text: "In this Act, unless the context otherwise requires,—\n\n(a) 'Example' means a thing characteristic of its kind or illustrating a general rule.\n\n(b) 'Law' includes any Ordinance, order, bye-law, rule, regulation, notification, custom or usage having in the territory of India the force of law."
          }
        ]
      },
      {
        chapter_number: "II",
        chapter_title: "General Principles",
        section_range: "3-3",
        sections: [
          {
            section_number: "3",
            // This section has no title
            text: "All principles outlined in this chapter are subject to the exceptions in Chapter X."
          }
        ]
      }
    ],
    schedules: [
      {
        schedule_number: "First Schedule",
        schedule_title: "List of Forms",
        sections: [
          {
            section_number: "1",
            section_title: "Form A - Application",
            text: "The application form should contain the following details:\n\n1. Name\n2. Address\n3. Purpose of Application"
          },
          {
            section_number: "2",
            section_title: "Form B - Fee Structure",
            text: "The fees are as follows:\n\n| Category      | Fee   |\n|---------------|-------|\n| General       | ₹100  |\n| Student       | ₹50   |\n| Senior Citizen| ₹25   |"
          }
        ]
      }
    ]
  };

  // Example of an Act without chapters:
  export const templateActWithoutChapters: Act = {
    act_name: "The Simple Edict, 2024",
    sections: [
      {
        section_number: "1",
        section_title: "Title",
        text: "This edict may be cited as The Simple Edict, 2024."
      },
      {
        section_number: "2",
        section_title: "Application",
        text: "This edict applies to all persons in the realm."
      }
    ]
  }

