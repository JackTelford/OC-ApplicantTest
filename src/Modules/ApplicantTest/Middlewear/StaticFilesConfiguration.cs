// File: ApplicantTest/Middlewear/StaticFilesConfiguration.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace ApplicantTest.Middlewear;

public static class StaticFilesConfiguration
{

    public static void UseCustomStaticFiles(this IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();

        // Serve static files from wwwroot
        app.UseStaticFiles();

        // Serve static files from /Modules/ApplicantTest/wwwroot/ProgramFiles/Browser with a specific request path
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "src", "Modules", "ApplicantTest", "wwwroot", "ProgramFiles", "Browser")),
            RequestPath = "/ProgramFiles/Browser",
            OnPrepareResponse = ctx =>
            {
                var fileExtension = Path.GetExtension(ctx.File.Name).ToLowerInvariant();
                ctx.Context.Response.ContentType = fileExtension switch
                {
                    ".js" => "application/javascript",
                    ".css" => "text/css",
                    ".html" => "text/html",
                    ".json" => "application/json",
                    ".png" => "image/png",
                    ".jpg" => "image/jpeg",
                    _ => "application/octet-stream"
                };
                ctx.Context.Response.Headers.CacheControl = "public,max-age=600";
                ctx.Context.Response.Headers.XContentTypeOptions = "nosniff";
                ctx.Context.Response.Headers.AccessControlAllowOrigin = "*";
            }
        });

        app.UseRouting();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapRazorPages();
        });
    }
}

// path /Middlewear/StaticFilesConfiguration.cs



// File: ApplicantTest/Middlewear/StaticFilesConfiguration.cs
/*using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace ApplicantTest.Middlewear;

public static class StaticFilesConfiguration
{
    public static void UseCustomStaticFiles(this IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseExceptionHandler("/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();

        // Serve static files from the default wwwroot directory
        app.UseStaticFiles();

        // Serve static files from the module's wwwroot directory
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "src", "Modules", "ApplicantTest", "wwwroot")),
            RequestPath = "/ApplicantTest",
            OnPrepareResponse = ctx =>
            {
                var fileExtension = Path.GetExtension(ctx.File.Name).ToLowerInvariant();
                ctx.Context.Response.ContentType = fileExtension switch
                {
                    ".js" => "application/javascript",
                    ".css" => "text/css",
                    ".html" => "text/html",
                    ".json" => "application/json",
                    ".png" => "image/png",
                    ".jpg" => "image/jpeg",
                    _ => "application/octet-stream"
                };
                ctx.Context.Response.Headers.CacheControl = "public,max-age=600";
                ctx.Context.Response.Headers.XContentTypeOptions = "nosniff";
                ctx.Context.Response.Headers.AccessControlAllowOrigin = "*";
            }
        });

        app.UseRouting();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapRazorPages();
        });
    }
}
*/
