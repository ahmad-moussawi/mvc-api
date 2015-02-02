using System.Web;
using System.Web.Optimization;

namespace MvcApi
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/js/libs").Include(
                           "~/web/js/jquery-2.1.0.js",
                           "~/web/js/moment.js",
                           "~/web/js/Chart.js",
                           "~/web/js/lodash.js",
                           "~/web/js/init.js",
                           "~/web/js/materialize.js",
                           "~/web/js/angular/angular.js",
                           "~/web/js/angular/ng-iban.js",
                           "~/web/js/angular/angular-filter.js",
                           "~/web/js/angular/angular-file-upload.js",
                           "~/web/js/angular/ng-form-reset.js",
                           "~/web/js/angular/angular-ui-router.js"
                           ));


            bundles.Add(new ScriptBundle("~/js/app").Include(
                "~/web/js/app/run.js",
                "~/web/js/app/app.js",
                "~/web/js/app/controllers.js",
                "~/web/js/app/directives.js",
                "~/web/js/app/filters.js",
                "~/web/js/app/services.js"
            ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                 "~/Content/bootstrap.css",
                 "~/Content/Site.css"));
        }
    }
}
