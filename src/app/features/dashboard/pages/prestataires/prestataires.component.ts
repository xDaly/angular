import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobFilterComponent } from '@features/dashboard/components/prestataires/job-filter/job-filter.component';

@Component({
  selector: 'app-prestataires',
  standalone: true,
  imports: [RouterModule,JobFilterComponent],
  templateUrl: './prestataires.component.html',
  styleUrl: './prestataires.component.scss'
})
export class PrestatairesComponent {
 users = [
    {
        img: 'https://randomuser.me/api/portraits/men/25.jpg',
        name: 'Brooklyn Simmons',
        phone: '00396547885612',
        posts: '1,908',
        followers: '34.0k',
        following: '897',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/16.jpg',
        name: 'Mark Jecno',
        phone: '00396547885612',
        posts: '875',
        followers: '12.0k',
        following: '1400',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/39.jpg',
        name: 'Dev John',
        phone: '00396547885612',
        posts: '1,274',
        followers: '15.0k',
        following: '1874',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/10.jpg',
        name: 'Johan Deo',
        phone: '00396547885612',
        posts: '500',
        followers: '8.0k',
        following: '570',
        busy : false
    },

    {
        img: 'https://randomuser.me/api/portraits/men/83.jpg',
        name: 'Douglas Reichel',
        phone: '00396547885612',
        posts: '460',
        followers: '2k',
        following: '350',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/77.jpg',
        name: 'Lisa lillian',
        phone: '00396547885612',
        posts: '547 ',
        followers: '3.5k',
        following: '822',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/68.jpg',
        name: 'Olivia rose',
        phone: '00396547885612',
        posts: '868 ',
        followers: '1k',
        following: '742',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/48.jpg',
        name: 'Sarah Karen',
        phone: '00396547885612',
        posts: '972 ',
        followers: '2.5k',
        following: '864',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/25.jpg',
        name: 'Brooklyn Simmons',
        phone: '00396547885612',
        posts: '1,908',
        followers: '34.0k',
        following: '897',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/16.jpg',
        name: 'Mark Jecno',
        phone: '00396547885612',
        posts: '875',
        followers: '12.0k',
        following: '1400',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/39.jpg',
        name: 'Dev John',
        phone: '00396547885612',
        posts: '1,274',
        followers: '15.0k',
        following: '1874',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/10.jpg',
        name: 'Johan Deo',
        phone: '00396547885612',
        posts: '500',
        followers: '8.0k',
        following: '570',
        busy : true
    },

    {
        img: 'https://randomuser.me/api/portraits/men/83.jpg',
        name: 'Douglas Reichel',
        phone: '00396547885612',
        posts: '460',
        followers: '2k',
        following: '350',
        busy : true
    },
    {
        img: 'https://randomuser.me/api/portraits/men/77.jpg',
        name: 'Lisa lillian',
        phone: '00396547885612',
        posts: '547 ',
        followers: '3.5k',
        following: '822',
        busy : true
    },
    {
        img: 'https://randomuser.me/api/portraits/men/68.jpg',
        name: 'Olivia rose',
        phone: '00396547885612',
        posts: '868 ',
        followers: '1k',
        following: '742',
        busy : true
    },
    {
        img: 'https://randomuser.me/api/portraits/men/48.jpg',
        name: 'Sarah Karen',
        phone: '00396547885612',
        posts: '972 ',
        followers: '2.5k',
        following: '864',
        busy : true
    },
    {
        img: 'https://randomuser.me/api/portraits/men/25.jpg',
        name: 'Brooklyn Simmons',
        phone: '00396547885612',
        posts: '1,908',
        followers: '34.0k',
        following: '897',
        busy : true
    },
    {
        img: 'https://randomuser.me/api/portraits/men/16.jpg',
        name: 'Mark Jecno',
        phone: '00396547885612',
        posts: '875',
        followers: '12.0k',
        following: '1400',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/39.jpg',
        name: 'Dev John',
        phone: '00396547885612',
        posts: '1,274',
        followers: '15.0k',
        following: '1874',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/10.jpg',
        name: 'Johan Deo',
        phone: '00396547885612',
        posts: '500',
        followers: '8.0k',
        following: '570',
        busy : false
    },

    {
        img: 'https://randomuser.me/api/portraits/men/83.jpg',
        name: 'Douglas Reichel',
        phone: '00396547885612',
        posts: '460',
        followers: '2k',
        following: '350',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/77.jpg',
        name: 'Lisa lillian',
        phone: '00396547885612',
        posts: '547 ',
        followers: '3.5k',
        following: '822',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/68.jpg',
        name: 'Olivia rose',
        phone: '00396547885612',
        posts: '868 ',
        followers: '1k',
        following: '742',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/48.jpg',
        name: 'Sarah Karen',
        phone: '00396547885612',
        posts: '972 ',
        followers: '2.5k',
        following: '864',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/25.jpg',
        name: 'Brooklyn Simmons',
        phone: '00396547885612',
        posts: '1,908',
        followers: '34.0k',
        following: '897',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/16.jpg',
        name: 'Mark Jecno',
        phone: '00396547885612',
        posts: '875',
        followers: '12.0k',
        following: '1400',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/39.jpg',
        name: 'Dev John',
        phone: '00396547885612',
        posts: '1,274',
        followers: '15.0k',
        following: '1874',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/10.jpg',
        name: 'Johan Deo',
        phone: '00396547885612',
        posts: '500',
        followers: '8.0k',
        following: '570',
        busy : false
    },

    {
        img: 'https://randomuser.me/api/portraits/men/83.jpg',
        name: 'Douglas Reichel',
        phone: '00396547885612',
        posts: '460',
        followers: '2k',
        following: '350',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/77.jpg',
        name: 'Lisa lillian',
        phone: '00396547885612',
        posts: '547 ',
        followers: '3.5k',
        following: '822',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/68.jpg',
        name: 'Olivia rose',
        phone: '00396547885612',
        posts: '868 ',
        followers: '1k',
        following: '742',
        busy : false
    },
    {
        img: 'https://randomuser.me/api/portraits/men/48.jpg',
        name: 'Sarah Karen',
        phone: '00396547885612',
        posts: '972 ',
        followers: '2.5k',
        following: '864',
        busy : false
    },
]
}
