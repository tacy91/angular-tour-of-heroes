import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls:['./heroes.component.css'],
  providers: []
  
})
export class HeroesComponent implements OnInit {	
    title = 'Tour of heroes';
    heroes : Hero[];
    selectedHero: Hero; 
	constructor(private heroService: HeroService,private router: Router){  }
	getHeroes(): void {
		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
	}
	ngOnInit(): void {
		this.getHeroes();
	}
	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}
	gotoDetail(): void{
		this.router.navigate(['/detail',this.selectedHero.id])
	}
	add(name: string): void {
		name=name.trim();
		if(!name) {return;}
		this.heroService.create(name)
			.then(hero => {
				this.heroes.push(hero);
				this.selectedHero = null;
			})
	}
}