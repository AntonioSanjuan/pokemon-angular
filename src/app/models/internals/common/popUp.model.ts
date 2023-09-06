export abstract class BasePopUp<T = any> {
    public popUpData!: BasePopUpData<T>;
}

export class BasePopUpData<T> {
    constructor(        
        public id: string,
        public data?: T
    ) {}
}