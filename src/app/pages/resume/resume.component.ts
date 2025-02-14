import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-resume',
    imports: [CommonModule],
    templateUrl: './resume.component.html',
    styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  profile = {
    name: 'Hakan İSMAİL',
    title: 'Computer Engineer',
    imagePath: 'profile_img.png',
    contact: {
      email: 'hakanismail53@gmail.com',
      phone: '+123 456 7890',
      location: 'Rize, Turkey'
    },
    skills: [
      { category: 'Programming Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'C'] },
      { category: 'Web Development', items: ['HTML', 'CSS', 'Angular', 'Bootstrap', 'Ionic'] },
      { category: 'Database Management', items: ['SQL', 'MongoDB'] },
      { category: 'DevOps', items: ['Docker', 'Git'] },
      { category: 'System Administration', items: ['Linux', 'Windows Server', 'Shell Scripting'] }
    ],
    education: [
      { degree: 'Computer Engineering', institution: 'Atatürk University', year: '2021 - Current' }
    ],
    experience: [
      {
        title: 'Web Developer',
        company: 'Netger',
        dates: 'May 2022 - Current',
        description: `• Developed Angular, TypeScript, Ionic, and SCSS for the development and upkeep of both web and mobile applications.
• Employed Figma for prototyping and designing user interfaces.
• Formulated and executed architectures for NoSQL and SQL databases, ensuring scalability, performance, and consistency. Additionally, utilized UML diagrams (use case, class, Entity-Relationship Diagrams (ERDs), etc.) for modeling data relationships.
• Engaged in collaborative efforts with team members to implement Kanban and Scrum practices, including daily standups, sprint planning meetings, and sprint retrospectives.
• Employed Git version control to monitor code changes, handle branches, and facilitate collaboration with team members. Implemented branching strategies such as Trunk Based Development (TBD) and GitFlow.`
      },
    ],
    certifications: [
      // Test data
      // { 
      //   name: 'Certified Angular Developer', 
      //   issuer: 'Angular University', 
      //   date: '2022', 
      //   credentialId: 'ANG123456', 
      //   link: 'https://example.com/certificate' 
      // },
      // { 
      //   name: 'Certified Python Programmer', 
      //   issuer: 'Python Institute', 
      //   date: '2021', 
      //   credentialId: 'PYTHON78910', 
      //   link: 'https://example.com/certificate2' 
      // }
    ]
    };

}
