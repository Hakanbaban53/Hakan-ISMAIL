import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about-me',
    imports: [CommonModule],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit {
  profile = {
    imagePath: 'profile_img.png',
    aboutMe: [
      'As a passionate computer engineer, I thrive on solving complex problems through innovative technology solutions. My journey in computer science has been driven by a desire to explore and work concurrently with various cutting-edge technologies. By staying updated with the latest advancements, I aim to build efficient and high-performing systems that can address real-world challenges.',
      'Currently, I am pursuing my studies in computer engineering with a focus on system management and DevOps. This academic background, coupled with my hands-on experience, enables me to design, develop, and deploy robust systems that optimize performance and reliability. I am committed to continuously expanding my skill set and knowledge base to keep pace with the rapidly evolving tech landscape.',
    ],
    skills: [
      'DevOps',
      'System Administration',
      'Python Development',
      'Automation',
      'CI/CD Pipelines',
      'Cloud Computing',
      'Linux Administration',
      'Docker',
      'Kubernetes',
      'Ansible',
      'Terraform',
      'Git',
      'AWS',
      'Azure',
      'Google Cloud Platform',
      'Networking',
      'Monitoring & Logging',
      'Jenkins',
      'Agile Methodologies',
      'Bash Scripting',
    ],
    interests:
      'Apart from being a computer engineer, I enjoy most of my time being outdoors. I enjoy hiking, cycling, and exploring new places. When forced indoors, I follow a number of sci-fi and fantasy genre movies and television shows, and I spend a large amount of my free time exploring the latest technology advancements in the DevOps and system administration world.',
  };

  constructor() {}

  ngOnInit(): void {}
}
