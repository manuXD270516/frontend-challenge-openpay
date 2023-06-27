import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ImageThumbnail, ImageVariant } from '../models/image.model';
import { Category, MarvelRequestOptions } from '../models/request.model';
import { MarvelCache, MarvelData, MarvelResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private url: string = environment.api + environment.backend.charactersApi;

  private cache: MarvelCache = {
    comics: undefined
  }

  constructor(private http: HttpClient) {
  }

  getImage(thumbnail: ImageThumbnail, variant: ImageVariant = ImageVariant.full) {
    return thumbnail && `${thumbnail.path}/${variant}.${thumbnail.extension}`;
  }

  getData(category: Category, options?: MarvelRequestOptions | undefined): Observable<any| undefined> {
    if (this.cache[category] && options?.offset === 0 && !(options?.nameStartsWith || options?.titleStartsWith)) {
      return of(this.cache[category]);
    }
 
    let url = `${this.url}` //${category}`;
    if (options) {
      Object.entries(options).forEach(([key, value]) => url += `&${key}=${value}`);
    }
    return this.http.get<any>(url).pipe(map(response => {
      if (response != null) {

        if (!(options?.nameStartsWith || options?.titleStartsWith)) {
          /*if (this.cache[category]) {
            this.cache[category] = {
              ...response.data,
              results: [...(this.cache[category]?.results || []), ...response.data.results]
            };
          } else {
            
          }*/
          this.cache[category] = response;
        }
        return response;
      } else {
        throw new Error('Something went wrong');
      }
    }));
  }
}
