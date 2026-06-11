export class Pipeline<T> {
  #transforms: Array<( data: T ) => T> = [];

  add( fn: ( data: T ) => T ): this {
    this.#transforms = [ ...this.#transforms, fn ];
    return this;
  }

  run( data: T ): T {
    return this.#transforms.reduce( ( acc, fn ) => fn( acc ), data );
  }
}
