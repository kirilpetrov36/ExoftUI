import { Component, Input, OnInit } from '@angular/core';
import { articleFile } from 'src/app/modules/articles-page/models/article-file.model';
import { Article } from 'src/app/modules/articles-page/models/article.model';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

    @Input() files: articleFile[];
	isImage: boolean;

    constructor() { }

    ngOnInit(): void {
		console.log(this.files);
		if (this.files.length !== 0){
			this.isImage = true;
		}
		else{
			this.isImage = false;
		}
    }

}
