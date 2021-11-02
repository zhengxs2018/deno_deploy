export type Next = () => Promise<any>;

export type Middleware<T> = (context: T, next: Next) => any;

export type ComposedMiddleware<T> = (context: T, next?: Next) => Promise<void>;

export default function compose<
  T = any,
  M extends Middleware<T> = Middleware<T>,
>(middleware: (M | Next)[]): ComposedMiddleware<T> {
  return (context, next) => {
    // last called middleware #
    let index = -1;

    function dispatch(i: number): Promise<void> {
      if (i <= index) {
        return Promise.reject(new Error("next() called multiple times"));
      }
      index = i;
      let fn: Next | M | undefined = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return dispatch(0);
  };
}
