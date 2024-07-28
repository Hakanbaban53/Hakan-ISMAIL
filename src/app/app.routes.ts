import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ConnectComponent } from './pages/connect/connect.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
    { path: 'about-me', component: AboutMeComponent, data: { animation: 'AboutPage' } },
    { path: 'resume', component: ResumeComponent, data: { animation: 'ResumePage' } },
    { path: 'projects', component: ProjectsComponent, data: { animation: 'ProjectsPage' } },
    { path: 'connect', component: ConnectComponent, data: { animation: 'ConnectPage' } },
    {path: '', redirectTo: 'home', pathMatch: 'full', data: { animation: 'HomePage' } },
];
