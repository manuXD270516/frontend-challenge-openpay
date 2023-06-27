import {Injectable} from '@angular/core';

import SecureStorage from 'secure-web-storage';


@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  private secureLocalStorage: Storage;
  constructor() {
    this.secureLocalStorage = new SecureStorage(localStorage, {
      hash: function hash(key: any) {
        return key.toString();
      },
      encrypt: function encrypt(data: any) {
        return data;
      },
      decrypt: function decrypt(data: any) {
        return data;
      }
    });
  }

  /**
   * All data from store are removed.
   */
  cleanStorage = () => this.secureLocalStorage.clear();

  /**
   * removes a key from localStorage and its sibling expiracy key
   * @param key storage key
   * @return telling if operation succeeded
   */
  removeStorage(key: string) {
    try {
      this.secureLocalStorage.removeItem(key + '_expiresIn');
      this.secureLocalStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * retrieves a key from Storage previously set with setStorage().
   * @param key storage key
   * @return value of storage key. null in case of expired key or failure
   */
  getStorage<T>(key: string): T | null {
    const now: number = Date.now();  // epoch time, lets deal only with integer
    // tslint:disable-next-line:no-non-null-assertion
    let expiresIn: number = + this.secureLocalStorage.getItem(key + '_expiresIn')!;
    if (expiresIn === undefined || expiresIn === null) { expiresIn = 0; }

    if (expiresIn < now) {// Expired
      this.removeStorage(key);
      return null;
    } else {
      try {
        const value = this.secureLocalStorage.getItem(key) as any;
        return value as T;
      } catch (e) {
        return null;
      }
    }
  }

  /**
   * writes a key into localStorage setting a expire time
   * @param key storage key
   * @param value storage value
   * @param expires number of seconds from now to expire the key
   */
  setStorage(key: string, value: any, expires: number | null = null) {
    if (expires === undefined || expires === null) {
      expires = (24 * 60 * 60);  // default: seconds for 1 day
    } else {
      expires = Math.abs(expires); // make sure it's positive
    }

    const now = Date.now();
    const schedule = now + expires * 1000;
    try {
      this.secureLocalStorage.setItem(key + '_expiresIn', '' + schedule);
      this.secureLocalStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }
}
