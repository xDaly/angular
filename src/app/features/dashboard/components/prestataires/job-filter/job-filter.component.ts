import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FeathericonComponent } from '@shared/components/feathericon/feathericon.component';

 interface Filter {
  id: number;
  title: string;
  isCollapsed: boolean;
  checkBoxs: checkBoxData[];
  button: string;
}

 interface checkBoxData {
  checkTitle: string;
  subTitle: string;
}

const Data = {
  filterData:  [
  {
     id: 1,
     title: 'Location',
     isCollapsed: false,
     checkBoxs: [
        {
           checkTitle: 'New York',
           subTitle: 'NY (399)'
        },
        {
           checkTitle: 'San Francisco',
           subTitle: 'CA (252)'
        },
        {
           checkTitle: 'Washington',
           subTitle: 'DC (226)'
        },
        {
           checkTitle: 'Seattle',
           subTitle: 'WA (242)'
        },
        {
           checkTitle: 'Chicago',
           subTitle: 'IL (187)'
        }
     ],
     button: 'All Locations'

  },
  {
     id: 2,
     title: 'Job Title',
     isCollapsed: false,
     checkBoxs: [
        {
           checkTitle: 'UI/Ux designer(25)',
           subTitle: '',
        },
        {
           checkTitle: 'Graphic designer(10)',
           subTitle: '',
        },
        {
           checkTitle: 'Front end designer(15)',
           subTitle: '',
        },
        {
           checkTitle: 'PHP developer(42)',
           subTitle: '',
        },
        {
           checkTitle: 'React Developer(5)',
           subTitle: '',
        }

     ],
     button: 'All Job Title'
  },
  {
     id: 3,
     title: 'Industry',
     isCollapsed: false,
     checkBoxs: [
        {
           checkTitle: 'Computer Software(14)',
           subTitle: '',
        },
        {
           checkTitle: ' IT Engineer(10)',
           subTitle: '',
        },
        {
           checkTitle: 'Service industry(20)',
           subTitle: '',
        },
        {
           checkTitle: 'Accounting(34)',
           subTitle: '',
        },
        {
           checkTitle: ' Financial Services(5)',
           subTitle: '',
        }

     ],
     button: 'All Industry'
  },
  {
     id: 4,
     title: 'Specific skills',
     isCollapsed: false,
     checkBoxs: [
        {
           checkTitle: 'HTML,scss & sass',
           subTitle: '',
        },
        {
           checkTitle: 'Javascript',
           subTitle: '',
        },
        {
           checkTitle: ' Node.js',
           subTitle: '',
        },
        {
           checkTitle: 'Gulp & Pug',
           subTitle: '',
        },
        {
           checkTitle: 'Angular.js',
           subTitle: '',
        }

     ],
     button: 'All Skills'
  }
],

  filterChackBox : [
  {
     id: "chk-ani",
     label: "Full-time",
     vacancy: 8688
  },
  {
     id: "chk-ani1",
     label: "Contract",
     vacancy: 503
  },
  {
     id: "chk-ani2",
     label: "Part-time",
     vacancy: 288
  },
  {
     id: "chk-ani3",
     label: "Internship",
     vacancy: 236
  },
  {
     id: "chk-ani4",
     label: "Temporary",
     vacancy: 146
  },
  {
     id: "chk-ani5",
     label: "Commission",
     vacancy: 25
  }
],

  jobCardsData : [
  {
     id: 1,
     rating: 5,
     image: 'assets/images/job-search/1.jpg',
     title: 'UI/UX IT Frontend Developer',
     subTitle: '(L6) Salt Lake City, UT',
     desc: 'We are looking for an experienced and Boho designer and/or frontend engineer with expertise in accessibility to join our team , 3+ years of experience working in as a Frontend Engineer or comparable role. You won’t be a team of one though — you’ll be collaborating closely with other...',
     tag: true,
     tagColor: 'primary',
     ribbion: false,
     ribbinIcon: '',
     time: false,
  },
  {
     id: 2,
     rating: 4,
     image: 'assets/images/job-search/2.jpg',
     title: 'React/React Native Developer',
     subTitle: 'San Diego, CA',
     desc: 'Ideally 2+ years experience with React. Bonus points if you have React Native experience. This is an incredibly exciting opportunity to gain commercial , Professional experience of React Native and other front end frameworks. Transform product wireframes into responsive, mobile user interface',
     tag: true,
     tagColor: 'primary',
     ribbion: false,
     ribbinIcon: '',
     time: false,
  },
  {
     id: 3,
     rating: 3,
     image: 'assets/images/job-search/3.jpg',
     title: 'Senior UX designer',
     subTitle: 'Minneapolis, MN',
     desc: 'The designer will apply Lean UX and Design Thinking practices in a highly collaborative, fast-paced, distributed environment You have 4+ years of UX experience. You support UX leadership by providing continuous feedback regarding the evolution of team process standards',
     tag: false,
     tagColor: '',
     ribbion: true,
     ribbinIcon: 'love',
     time: true,
  },
  {
     id: 4,
     rating: 4,
     image: 'assets/images/job-search/4.jpg',
     title: 'Front end web developer',
     subTitle: 'Cisco Lelystad, Netherlands',
     desc: 'Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become.',
     tag: false,
     tagColor: '',
     ribbion: false,
     ribbinIcon: '',
     time: true,
  },
  {
     id: 5,
     rating: 3,
     image: 'assets/images/job-search/5.jpg',
     title: 'Graphic designer',
     subTitle: 'Infosys Lelystad, Netherlands',
     desc: 'Contented get distrusts certainty nay are frankness concealed ham. On unaffected resolution on considered of. No thought me husband or colonel forming effects. End sitting shewing who saw besides son musical adapted. Contrasted interested eat alteration pianoforte sympathize was.',
     tag: false,
     tagColor: '',
     ribbion: false,
     ribbinIcon: '',
     time: true,
  },
  {
     id: 6,
     rating: 3,
     image: 'assets/images/job-search/6.jpg',
     title: 'Designer, CRM',
     subTitle: 'Citrix Lelystad, Netherlands',
     desc: 'Situation admitting promotion at or to perceived be. Mr acuteness we as estimable enjoyment up. An held late as felt know. Learn do allow solid to grave. Middleton suspicion age her attention. Chiefly several bed its wishing. Is so moments on chamber pressed to. Doubtful yet way properly answered.',
     tag: false,
     tagColor: '',
     ribbion: false,
     ribbinIcon: '',
     time: true,
  },
  {
     id: 7,
     rating: 4,
     image: 'assets/images/job-search/2.jpg',
     title: 'React/React Native Developer',
     subTitle: 'San Diego, CA',
     desc: 'Ideally 2+ years experience with React. Bonus points if you have React Native experience. This is an incredibly exciting opportunity to gain commercial , Professional experience of React Native and other front end frameworks. Transform product wireframes into responsive',
     tag: false,
     tagColor: '',
     ribbion: true,
     ribbinIcon: 'love',
     time: true,
  },
  {
     id: 8,
     rating: 3,
     image: 'assets/images/job-search/3.jpg',
     title: 'Senior UX designer',
     subTitle: 'Minneapolis, MN',
     desc: 'The designer will apply Lean UX and Design Thinking practices in a highly collaborative, fast-paced, distributed environment You have 4+ years of UX experience. You support UX leadership by providing continuous feedback regarding the evolution of team process standards',
     tag: false,
     tagColor: '',
     ribbion: false,
     ribbinIcon: '',
     time: true,
  },
  {
     id: 9,
     rating: 3,
     image: 'assets/images/job-search/5.jpg',
     title: 'Graphic designer',
     subTitle: 'Infosys Lelystad, Netherlands',
     desc: 'Contented get distrusts certainty nay are frankness concealed ham. On unaffected resolution on considered of. No thought me husband or colonel forming effects. End sitting shewing who saw besides son musical adapted. Contrasted interested eat alteration pianoforte sympathize was.',
     tag: false,
     tagColor: '',
     ribbion: false,
     ribbinIcon: '',
     time: true,
  },
  {
     id: 10,
     rating: 3,
     image: 'assets/images/job-search/6.jpg',
     title: 'Designer, CRM',
     subTitle: 'Citrix Lelystad, Netherlands',
     desc: 'Situation admitting promotion at or to perceived be. Mr acuteness we as estimable enjoyment up. An held late as felt know. Learn do allow solid to grave. Middleton suspicion age her attention. Chiefly several bed its wishing. Is so moments on chamber pressed to. Doubtful yet way properly answered.',
     tag: false,
     tagColor: '',
     ribbion: false,
     ribbinIcon: '',
     time: true,
  },
  {
     id: 11,
     rating: 5,
     image: 'assets/images/job-search/1.jpg',
     title: 'UI/UX IT Frontend Developer',
     subTitle: '(L6) Salt Lake City, UT',
     desc: 'We are looking for an experienced and Boho designer and/or frontend engineer with expertise in accessibility to join our team , 3+ years of experience working in as a Frontend Engineer or comparable role. You won’t be a team of one though — you’ll be collaborating closely with other...',
     tag: true,
     tagColor: 'primary',
     ribbion: false,
     ribbinIcon: '',
     time: false,
  },
  {
     id: 12,
     rating: 4,
     image: 'assets/images/job-search/2.jpg',
     title: 'React/React Native Developer',
     subTitle: 'San Diego, CA',
     desc: 'Ideally 2+ years experience with React. Bonus points if you have React Native experience. This is an incredibly exciting opportunity to gain commercial , Professional experience of React Native and other front end frameworks. Transform product wireframes into responsive, mobile user interface',
     tag: true,
     tagColor: 'primary',
     ribbion: false,
     ribbinIcon: '',
     time: false,
  },
  {
     id: 13,
     rating: 4,
     image: 'assets/images/job-search/4.jpg',
     title: 'Front end web developer',
     subTitle: 'Cisco Lelystad, Netherlands',
     desc: 'Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor. Explained propriety off out perpetual his you. Feel sold off felt nay rose met you. We so entreaties cultivated astonished is. Was sister for few longer mrs sudden talent become.',
     tag: false,
     tagColor: '',
     ribbion: false,
     ribbinIcon: '',
     time: true,
  },
  {
     id: 14,
     rating: 3,
     image: 'assets/images/job-search/3.jpg',
     title: 'Senior UX designer',
     subTitle: 'Minneapolis, MN',
     desc: 'The designer will apply Lean UX and Design Thinking practices in a highly collaborative, fast-paced, distributed environment You have 4+ years of UX experience. You support UX leadership by providing continuous feedback regarding the evolution of team process standards',
     tag: false,
     tagColor: '',
     ribbion: true,
     ribbinIcon: 'love',
     time: true,
  },
],

  jobDetail : [
  {
     title: 'Job Description',
     liClass: false,
     data: [
        {
           desctiption: "Endless is looking for a UI/UX Designer to join our team. The world is seeing an explosion in the amount and variety of location-baWe are looking for a versatile UX/UI Designer to join our growing design team. Our designers contribute to clients’ projects at all stages of development. We might start from scratch, conducting user and stakeholder interviews, making personas and journey maps, and continue on to iterating on designs and prototypes through delivering final assets for launch. We might come into the middle of an in-flight program-size project and conduct analysis and usability correction or feature enhancement. We might provide research and vision for handoff to an internal development team."
        }
     ]
  },
  {
     title: 'Qualifications',
     liClass: true,
     data: [
        { desctiption: "Have shipped multiple iOS, Android, and/or web products" },
        { desctiption: "5+ years UI/UX experience" },
        { desctiption: "Portfolio demonstrating mastery of native iOS, Android, and/or responsive web design principles" },
        { desctiption: "Ability to autonomously pursue elegant solutions to open-ended problems" },
        { desctiption: "Comfort with ambiguity" },
        { desctiption: "Proven ability to create interactive prototypes" },
        { desctiption: "Strong verbal communication skills with ability to clearly communicate complex ideas and champion a design vision across all levels of an organization" },
        { desctiption: "Strong written communication skills with ability to make transparent design documentation and client-facing presentations" },
        { desctiption: "Ability to create and maintain flow charts, wire frames, prototypes, and mockups." },
        { desctiption: "Ability to effectively work on more than one project at a time" },
        { desctiption: "Experience conducting user research and stakeholder interviews" },
        { desctiption: "Solid grasp of standard design tools, ex: Sketch, Omnigraffle, the Adobe Suite, Zeplin, etc." },
        { desctiption: "Bonus Considerations" },
     ]
  },
  {
     title: 'Agency experience',
     liClass: true,
     data: [
        { desctiption: "Experience working with Agile development teams" },
        { desctiption: "Experience with RITE method usability testing" },
        { desctiption: "Experience in visual and motion design; ability to translate UX design into high quality visuals" },
        { desctiption: "Mastery of Sketch & InVision" },
        { desctiption: "Knowledge of mobile or front-end web programming" },
     ]
  },
  {
     title: 'Perks',
     liClass: true,
     data: [
        { desctiption: "Competitive pay" },
        { desctiption: "Competitive medical, dental, and vision insurance plans" },
        { desctiption: "Company-provided 401(k) plan" },
        { desctiption: "Paid vacation and sick time" },
        { desctiption: "Free snacks and beverages" },
     ]
  }
]

}
@Component({
  selector: 'app-job-filter',
  standalone: true,
  imports: [NgbCollapseModule,FeathericonComponent],
  templateUrl: './job-filter.component.html',
  styleUrl: './job-filter.component.scss'
})
export class JobFilterComponent {
  public filterData = Data.filterData;
  public filterChackBox = Data.filterChackBox;
  public isCollapsed = false;
  public isCollapsed2 = false;
  public isCollapsed3 = false;
  public isCollapsed4 = false;
  public OpenFilter: boolean = false

  constructor() { }

  openFilter() {
    this.OpenFilter = !this.OpenFilter
  }

}
