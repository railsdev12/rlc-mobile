/**
 * Class for defining API routes
 */
export class APIRoutes {
  // Use to build api routes
  static createRoute(route) {
    return `api/${route}`;
  }

  static deviseRoute(route) {
    return `users/${route}`;
  }

  // Signup and Login
  static signupPath() {
    return `users`;
  }
  static loginPath() {
    return APIRoutes.deviseRoute(`sign_in`);
  }

  // Reset Password
  static UserPasswordPath() {
    return APIRoutes.deviseRoute(`password`);
  }

  // Availiability
  static updateAvailabilityPath() {
    return APIRoutes.createRoute(`users/update_availability`);
  }

  static getAvailabilityPath() {
    return APIRoutes.createRoute('users/get_availability');
  }

  // Events
  // Upcoming, attended, etc events
  static getEventsPath(id, type) {
    return APIRoutes.createRoute(`users/${id}/events/${type}`);
  }

  // Event Details
  static getEventDetailsPath(id) {
    return APIRoutes.createRoute(`show_event/${id}`);
  }

  //Locations
  static getRegionsPath() {
    return APIRoutes.createRoute("get_regions");
  }

  static getRegionPath(id) {
    return APIRoutes.createRoute(`get_region/${id}`);
  }

  static getLocationsPath() {
    return APIRoutes.createRoute("get_locations");
  }

  static getLocationsByRegionPath(id) {
    return APIRoutes.createRoute(`get_locations/${id}`);
  }

  static getLocationPath(id) {
    return APIRoutes.createRoute(`get_location/${id}`);
  }

  // Update User
  static updateUserPath(id) {
    return APIRoutes.createRoute(`users/${id}/update`)
  }
}
