/**
 * React Router Redirect
 * Redirects user while maintaining history
 * @param event
 * @param href
 */
export default function routerRedirect(event: any, href: string, navigateRouter: Function) {
  if (!(event.metaKey || event.ctrlKey)) {
    event.preventDefault();// prevent the href from redirecting you
    navigateRouter(href); // change the DOM
  }
}
