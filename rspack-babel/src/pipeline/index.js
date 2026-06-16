export class Pipeline {
  #transforms = [];

  add( fn ) {
    this.#transforms = [ ...this.#transforms, fn ];
    return this;
  }

  run( data ) {
    return this.#transforms.reduce( ( acc, fn ) => fn( acc ), data );
  }
}
