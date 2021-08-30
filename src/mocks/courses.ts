/**
 * Mocks - Courses
 *
 * Note: we use snake_case field naming because we'll use that format for the database fields
 */

// Type
import { Course } from '../types/course'
import { LESSON_TYPE } from '../types/lesson.d'

export const Courses: Course[] = [
  {
    id: 1,
    title: 'Main Player Safeguarding',
    description: `Implement best practice to keep children safe and ensure involvement in football
      is fun for all or part of people`,
    author: 'UAE FA',
    progress: 12,
    media: [
      {
        id: 1,
        type: 'image',
        category: 'cover',
        filename: '/courses/safeguarding.jpg'
      }
    ],
    modules: [
      {
        id: 1,
        title: 'Introduction',
        description: '',
        lessons: [
          {
            id: 1,
            type: LESSON_TYPE.text,
            title: 'Introduction',
            status: 'completed',
            description: '',
            content: `As the global governing body for football, FIFA is committed to supporting its members to implement best practice to keep children safe and ensure involvement in football is fun for all. While FIFA does not control the day-to-day operations of our members, or their affiliated organisations and clubs who are independently organised, this toolkit sets minimum requirements for all members on child safeguarding.`
          },
          {
            id: 2,
            type: LESSON_TYPE.text,
            title: 'Overview',
            status: 'completed',
            description: '',
            content: `This course will underpin our work and that of our 211 MAs and the six confederations.
            It provides a framework to help members consider how they can prevent any risk of harm to children in football and respond appropriately, as called for in the FIFA Forward 2.0 Regulations, article 8, paragraph 1t.

            The toolkit recognises that many MAs already have good policies, procedures and training in place and builds on the great work of our partners around the world. It is part of FIFA’s overall commitment to safeguard children1 and will be supplemented with further guidance, templates, knowledge-sharing and training to support MAs, together with the confederations, in developing their own policies, procedures and good practices. FIFA considers this a living document that is to be updated every twenty-four months based on feedback and practical experience from our members.`
          }
        ]
      },
      {
        id: 2,
        title: 'Getting Started',
        description: '',
        lessons: [
          {
            id: 3,
            type: LESSON_TYPE.text,
            title: 'Who is this for?',
            status: 'started',
            description: '',
            content: `This is a resource for all stakeholders working to safeguard children in football. Specifically, it is intended for MAs:
            • to promote accountability and responsibility for keeping children safe from harm when involved in any football activity;
            • to self-assess and inform the development of their safeguarding policies, plans and programmes, including for human resource and training needs;
            • to assist coordinators and technical staff with risk assessments and the development of safeguarding plans and programmes;
            • to support practitioners, such as coaches, trainers, medical personnel, staff and volunteers, who provide services, training and programmes to children to apply good practice for effective action.`
          },
          {
            id: 4,
            type: LESSON_TYPE.text,
            title: 'The five principles',
            status: 'pending',
            description: '',
            content: `In line with the terms and spirit of the UNCRC, safeguarding children in football is based around the following five principles that apply to all stakeholders :
            1. We will act in the best interests of children.2 Ensuring that children are safeguarded is part of a commitment to enhancing their enjoyment of and performance in football.
            2. Children’s rights, as set out in the UNCRC, will be respected and promoted throughout the game of football.
            3. The principles and practices in this toolkit will be applied to all children and without discrimination on account of race, skin colour, ethnic, national or social origin, gender, disability, language, religion, political opinion or any other opinion, wealth, birth or any other status, sexual orientation or any other reason.
            4. Safeguarding children is everyone’s responsibility, regardless of the country we are from or the role we hold in football. This means that when children are in our care we have a duty to safeguard them, without exception.
            5. Specific roles and responsibilities must be defined within MAs and all concerns will be reported and dealt with immediately in accordance with stated procedures, in line with national legislation, and with the best interests of the child as the primary concern.
          `
          },
          {
            id: 5,
            type: LESSON_TYPE.text,
            title: 'Creating a safeguarding policy',
            status: 'pending',
            description: '',
            content: `Every MA that engages directly or indirectly with children has a duty to do all it can to protect children from harm within football and to promote their well-being. A child safeguarding policy provides MAs with a formal approach to managing this duty of care. Safeguarding children is supported by having a good, clear and accessible policy in place so that both adults and children are clear on what is expected of them and others. This step refers to the development of an “organisational policy” within MAs, meaning a policy that should be in place for all aspects of the game, all year round.
            `
          },
          {
            id: 6,
            type: LESSON_TYPE.text,
            title: 'Developing procedures',
            status: 'pending',
            description: '',
            content: `It is essential to have or develop procedures in the following three areas, in order to implement your
            safeguarding policy.`
          }
        ]
      },
      {
        id: 3,
        title: 'Communication and education',
        description: '',
        lessons: [
          {
            id: 7,
            type: LESSON_TYPE.text,
            title: 'Communication',
            status: 'pending',
            description: '',
            content: ''
          },
          {
            id: 8,
            type: LESSON_TYPE.text,
            title: 'Education',
            status: 'pending',
            description: '',
            content: ''
          }
        ]
      },
      {
        id: 4,
        title: 'Monitoring and evaluating',
        description: '',
        lessons: [
          {
            id: 9,
            type: LESSON_TYPE.text,
            title: 'Monitoring',
            status: 'pending',
            description: '',
            content: ''
          },
          {
            id: 10,
            type: LESSON_TYPE.text,
            title: 'Evaluating',
            status: 'pending',
            description: '',
            content: ''
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Player DRYKISS',
    description: `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.`,
    author: 'EUA DA',
    progress: 47,
    media: [
      {
        id: 1,
        type: 'image',
        category: 'cover',
        filename: '/courses/slack_imgs.com.jpeg'
      }
    ],
    modules: [
      {
        id: 1,
        title: 'Introduction',
        description: '',
        lessons: [
          {
            id: 1,
            type: LESSON_TYPE.text,
            title: 'Introduction',
            status: 'completed',
            description: '',
            content: `As the global governing body for football Team, FIFA is committed to supporting its members to implement best practice to keep children safe and ensure involvement in football is fun for all. While FIFA does not control the day-to-day operations of our members, or their affiliated organisations and clubs who are independently organised, this toolkit sets minimum requirements for all members on child safeguarding.`
          },
          {
            id: 2,
            type: LESSON_TYPE.text,
            title: 'Overview',
            status: 'started',
            description: '',
            content: `This course will underpin our work and that of our 211 MAs and the six confederations.
            It provides a framework to help members consider how they can prevent any risk of harm to children in football and respond appropriately, as called for in the FIFA Forward 2.0 Regulations, article 8, paragraph 1t.

            The toolkit recognises that many MAs already have good policies, procedures and training in place and builds on the great work of our partners around the world. It is part of FIFA’s overall commitment to safeguard children1 and will be supplemented with further guidance, templates, knowledge-sharing and training to support MAs, together with the confederations, in developing their own policies, procedures and good practices. FIFA considers this a living document that is to be updated every twenty-four months based on feedback and practical experience from our members.`
          },
          {
            id: 3,
            type: LESSON_TYPE.text,
            title: 'Third Steps',
            status: 'pending',
            description: '',
            content: `This course will underpin our work and that of our 211 MAs and the six confederations.
            It provides a framework to help members consider how they can prevent any risk of harm to children in football and respond appropriately, as called for in the FIFA Forward 2.0 Regulations, article 8, paragraph 1t.

            The toolkit recognises that many MAs already have good policies, procedures and training in place and builds on the great work of our partners around the world. It is part of FIFA’s overall commitment to safeguard children1 and will be supplemented with further guidance, templates, knowledge-sharing and training to support MAs, together with the confederations, in developing their own policies, procedures and good practices. FIFA considers this a living document that is to be updated every twenty-four months based on feedback and practical experience from our members.`
          }
        ]
      },
      {
        id: 2,
        title: 'Getting Started',
        description: '',
        lessons: [
          {
            id: 4,
            type: LESSON_TYPE.text,
            title: 'Who is this for?',
            status: 'pending',
            description: '',
            content: `This is a resource for all stakeholders working to safeguard children in football. Specifically, it is intended for MAs:
            • to promote accountability and responsibility for keeping children safe from harm when involved in any football activity;
            • to self-assess and inform the development of their safeguarding policies, plans and programmes, including for human resource and training needs;
            • to assist coordinators and technical staff with risk assessments and the development of safeguarding plans and programmes;
            • to support practitioners, such as coaches, trainers, medical personnel, staff and volunteers, who provide services, training and programmes to children to apply good practice for effective action.`
          },
          {
            id: 5,
            type: LESSON_TYPE.text,
            title: 'The five principles',
            status: 'pending',
            description: '',
            content: `In line with the terms and spirit of the UNCRC, safeguarding children in football is based around the following five principles that apply to all stakeholders :
            1. We will act in the best interests of children.2 Ensuring that children are safeguarded is part of a commitment to enhancing their enjoyment of and performance in football.
            2. Children’s rights, as set out in the UNCRC, will be respected and promoted throughout the game of football.
            3. The principles and practices in this toolkit will be applied to all children and without discrimination on account of race, skin colour, ethnic, national or social origin, gender, disability, language, religion, political opinion or any other opinion, wealth, birth or any other status, sexual orientation or any other reason.
            4. Safeguarding children is everyone’s responsibility, regardless of the country we are from or the role we hold in football. This means that when children are in our care we have a duty to safeguard them, without exception.
            5. Specific roles and responsibilities must be defined within MAs and all concerns will be reported and dealt with immediately in accordance with stated procedures, in line with national legislation, and with the best interests of the child as the primary concern.
          `
          },
          {
            id: 6,
            type: LESSON_TYPE.text,
            title: 'Creating a safeguarding policy',
            status: 'pending',
            description: '',
            content: `Every MA that engages directly or indirectly with children has a duty to do all it can to protect children from harm within football and to promote their well-being. A child safeguarding policy provides MAs with a formal approach to managing this duty of care. Safeguarding children is supported by having a good, clear and accessible policy in place so that both adults and children are clear on what is expected of them and others. This step refers to the development of an “organisational policy” within MAs, meaning a policy that should be in place for all aspects of the game, all year round.
            `
          },
          {
            id: 7,
            type: LESSON_TYPE.text,
            title: 'Developing procedures',
            status: 'pending',
            description: '',
            content: `It is essential to have or develop procedures in the following three areas, in order to implement your
            safeguarding policy.`
          }
        ]
      },
      {
        id: 3,
        title: 'Communication and education',
        description: '',
        lessons: [
          {
            id: 8,
            type: LESSON_TYPE.text,
            title: 'Communication',
            status: 'pending',
            description: '',
            content: ''
          },
          {
            id: 9,
            type: LESSON_TYPE.text,
            title: 'Education',
            status: 'pending',
            description: '',
            content: ''
          },
          {
            id: 10,
            type: LESSON_TYPE.text,
            title: 'Other Mission',
            status: 'pending',
            description: '',
            content: ''
          }
        ]
      },
      {
        id: 4,
        title: 'Monitoring and evaluating',
        description: '',
        lessons: [
          {
            id: 11,
            type: LESSON_TYPE.text,
            title: 'Monitoring',
            status: 'pending',
            description: '',
            content: ''
          },
          {
            id: 12,
            type: LESSON_TYPE.text,
            title: 'Evaluating',
            status: 'pending',
            description: '',
            content: ''
          }
        ]
      },
      {
        id: 5,
        title: 'Special Case Study',
        description: '',
        lessons: [
          {
            id: 13,
            type: LESSON_TYPE.text,
            title: 'Founding',
            status: 'pending',
            description: '',
            content: ''
          },
          {
            id: 14,
            type: LESSON_TYPE.text,
            title: 'Story Creating',
            status: 'pending',
            description: '',
            content: ''
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Playmaker',
    description: `Playmaker by UAE FA is a new entry-level football course for volunteers in the grassroots game open to anyone aged 14 or over. Its completely free, all online and requires no previous football experience or qualifications to join.`,
    author: 'UAE FA',
    progress: 100,
    media: [
      {
        id: 1,
        type: 'image',
        category: 'cover',
        filename: '/courses/playmarker.jpg'
      }
    ],
    modules: [
      {
        id: 1,
        title: 'HOW ITS STRUCTURED',
        description: '',
        lessons: [
          {
            id: 1,
            type: LESSON_TYPE.text,
            title: 'Introduction',
            status: 'completed',
            description: '',
            content: `The online modules of BT Playmaker cover five core areas, taking around four-and-a-half hours to complete overall.
            But there’s no time limit on completing all five - you can do them at your own pace and around your schedule`
          }
        ]
      },
      {
        id: 2,
        title: 'GET STARTED',
        description: '',
        lessons: [
          {
            id: 2,
            type: LESSON_TYPE.text,
            title: 'Who is this for?',
            status: 'completed',
            description: '',
            content: `
            • This module introduces you to the course, what a BT Playmaker is, and its importance in making football happen for all;
            • To start, you’ll be invited to take a pre-course questionnaire to gauge your football knowledge;
            • Don’t worry, you’re not required to be a football expert - it just helps create a starting point for your progress through the rest of the course`
          }
        ]
      },
      {
        id: 3,
        title: 'CONNECT WITH YOUR PLAYERS',
        description: '',
        lessons: [
          {
            id: 3,
            type: LESSON_TYPE.text,
            title: 'First',
            status: 'completed',
            description: '',
            content: `A big part of making fun, safe and inclusive football happen is being able to engage with your players`
          },
          {
            id: 4,
            type: LESSON_TYPE.text,
            title: 'Second',
            status: 'completed',
            description: '',
            content: `That can be easier said than done! So this module will show you some useful communication and motivation techniques you can use to connect with your players.`
          }
        ]
      },
      {
        id: 4,
        title: 'CREATE FUN SESSIONS',
        description: '',
        lessons: [
          {
            id: 5,
            type: LESSON_TYPE.text,
            title: 'Pre-session planning',
            status: 'completed',
            description: '',
            content:
              'In your role as a BT Playmaker, you may be required to do some pre-session planning'
          },
          {
            id: 6,
            type: LESSON_TYPE.text,
            title: 'Weekly planning',
            status: 'completed',
            description: '',
            content: `This module has you covered. It will show you a range of tools you can plug straight into your weekly planning`
          }
        ]
      }
    ]
  }
]
