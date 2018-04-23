'use strict';

export const LOADING_GIF: string="<img src='./../../assets/imagenes/ajax_loader_gray_512.gif' style='max-width:25px;max-heigh:25px;'></img>";;
export const SERVER: string="http://www.njsr27.com/API";
export let ACTIVE_PROFILE: string=null;
export function setActiveProfile(newValue: string){
	ACTIVE_PROFILE = newValue;
}