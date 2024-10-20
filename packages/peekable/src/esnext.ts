declare global {
  interface AsyncDisposable {}
  interface Disposable {}
}

declare module './index.js' {
  interface AsyncPeekableIterator extends AsyncDisposable {}
  interface PeekableIterator extends Disposable {}
}

export { AsyncPeekableIterator, PeekableIterator } from './index.js';
