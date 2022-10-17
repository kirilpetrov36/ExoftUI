import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
    name: 'contentPreview'
})
export class ContentPreviewPipe implements PipeTransform {
	transform(value: string, args?: any): string {
		if (value.length > 70){
			return value.slice(0, 70).concat("...");
		}
		else{
			return value;
		}
		
	}
}