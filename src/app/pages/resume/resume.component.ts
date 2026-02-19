import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-resume',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent {
  profile = {
    name: 'Hakan İSMAİL',
    title: 'Systems Engineer & Toolsmith',
    imagePath: 'profile_img.png',
    aboutMe: [
      'As a passionate computer engineer, I thrive on solving complex problems through innovative technology solutions. My journey in computer science has been driven by a desire to explore and work concurrently with various cutting-edge technologies. By staying updated with the latest advancements, I aim to build efficient and high-performing systems that can address real-world challenges.',
      'Currently, I am pursuing my studies in computer engineering with a focus on system management and DevOps. This academic background, coupled with my hands-on experience, enables me to design, develop, and deploy robust systems that optimize performance and reliability. I am committed to continuously expanding my skill set and knowledge base to keep pace with the rapidly evolving tech landscape.',
    ],
    interests:
      'Apart from being a computer engineer, I enjoy most of my time being outdoors. I enjoy hiking, cycling, and exploring new places. When forced indoors, I follow a number of sci-fi and fantasy genre movies and television shows, and I spend a large amount of my free time exploring the latest technology advancements in the DevOps and system administration world.',
    summary:
      'Systems Engineer & Open Source Developer with experience in Enterprise IT operations and modern software architecture. Specialist in Linux/Windows administration, deploying scalable infrastructure (OpenStack, Proxmox), and network security. High proficiency in Rust and TypeScript for architecting custom infrastructure tools and automating workflows.',
    contact: {
      email: 'hakanismail53@gmail.com',
      // phone: '555-053-7018',
      location: 'İstanbul, Turkey',
      linkedin: 'linkedin.com/in/hakan-ismail',
    },
    skills: [
      {
        category: 'Programming',
        items: ['Rust', 'Python', 'TypeScript', 'C#', 'Bash', 'PowerShell'],
      },
      {
        category: 'Systems',
        items: [
          'Linux (Arch, RHEL, Ubuntu)',
          'Windows Server (AD/RDS)',
          'Proxmox VE',
          'OpenStack',
        ],
      },
      {
        category: 'Networking',
        items: [
          'Fortigate',
          'VLAN',
          'OpenVPN',
          'Tailscale',
          'TCP/IP',
          'FUSE Protocols',
        ],
      },
      {
        category: 'Infrastructure',
        items: [
          'Docker',
          'Kubernetes',
          'Ansible',
          'Zabbix',
          'GitHub Actions (CI/CD)',
        ],
      },
      {
        category: 'Databases',
        items: ['SQL', 'NoSQL', 'Firebase Firestore'],
      },
    ],
    education: [
      {
        degree: 'Bachelor of Computer Engineering',
        institution: 'Atatürk University',
        year: 'Sep 2021 – Jan 2026',
        thesis:
          'Containerization of Artificial Neural Networks for Distributed Systems',
      },
    ],
    experience: [
      {
        title: 'System Services and Network Labs Intern',
        company: 'Magna International',
        dates: 'Jul 2025 - Sep 2025',
        description: `• Architected a High-Availability Proxmox VE cluster using KVM/QEMU for enterprise workloads.
• Implemented VLAN segmentation and Fortigate NGFW security policies to enhance network isolation.
• Automated Active Directory and server provisioning workflows using Ansible and PowerShell.
• Deployed Zabbix for real-time infrastructure monitoring and alerting.
• Developed custom C# utilities for operational efficiency and systems integration.`,
      },
      {
        title: 'Jr. Full Stack Developer',
        company: 'Netger A.Ş.',
        dates: 'May 2022 - Jun 2024',
        description: `• Developed web and mobile applications using Angular, TypeScript, and Ionic for performance-critical projects.
• Built and integrated serverless APIs using Firebase and Node.js.
• Designed and optimized NoSQL/SQL database architectures for scalability and data consistency.`,
      },
    ],
  };
}
