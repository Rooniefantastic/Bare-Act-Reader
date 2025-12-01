import type { Act } from '../types';

export const indianPenalCode: Act = {
    act_name: "The Indian Penal Code, 1860",
    chapters: [
      {
        chapter_number: "1",
        chapter_title: "Introduction",
        section_range: "1-5",
        sections: [
          {
            section_number: "1",
            section_title: "Title and extent of operation of the Code",
            text: "This Act shall be called the Indian Penal Code, and shall ¹[extend to the whole of India ²***.]",
            annotations: [
              { "id": "1", "detail": "Subs. by Act 3 of 1951, s. 3 and the Sch., for 'except Part B States'." },
              { "id": "2", "detail": "The words 'except the State of Jammu and Kashmir' omitted by Act 34 of 2019, s. 95 and the Fifth Schedule (w.e.f. 31-10-2019)." }
            ]
          },
          {
            section_number: "2",
            section_title: "Punishment of offences committed within India",
            text: "Every person shall be liable to punishment under this Code and not otherwise for every act or omission contrary to the provisions thereof, of which he shall be guilty within ¹[India] ²***."
          }
        ]
      },
      {
        chapter_number: "4",
        chapter_title: "General Exceptions",
        section_range: "76-106",
        sections: [
          {
            section_number: "76",
            section_title: "Act done by a person bound, or by mistake of fact believing himself bound, by law",
            text: "Nothing is an offence which is done by a person who is, or who by reason of a mistake of fact and not by reason of a mistake of law in good faith believes himself to be, bound by law to do it.",
            illustration: "A, a soldier, fires on a mob by the order of his superior officer, in conformity with the commands of the law. A has committed no offence.",
            explanation: "This section provides a defence for a person who is either bound by law to do something, or believes in good faith due to a mistake of fact (not law) that they are bound by law to do it. The key is the 'good faith' belief and it being a mistake of 'fact'."
          },
          {
            section_number: "77",
            section_title: "Act of Judge when acting judicially",
            text: "Nothing is an offence which is done by a Judge when acting judicially in the exercise of any power which is, or which in good faith he believes to be, given to him by law.",
            explanation: "This section provides absolute immunity to judges for acts performed in their judicial capacity. The protection applies even if the judge exceeds their powers, as long as they believe in good faith they have the authority to act."
          }
        ]
      }
    ]
  };
