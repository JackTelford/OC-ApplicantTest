/*using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

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
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
            RequestPath = "/ApplicantTest", // Add this line to specify the request path
            OnPrepareResponse = ctx =>
            {
                var fileExtension = Path.GetExtension(ctx.File.Name).ToLowerInvariant();
                switch (fileExtension)
                {
                    case ".js":
                    ctx.Context.Response.ContentType = "application/javascript";
                    break;
                    case ".css":
                    ctx.Context.Response.ContentType = "text/css";
                    break;
                    case ".html":
                    ctx.Context.Response.ContentType = "text/html";
                    break;
                    case ".json":
                    ctx.Context.Response.ContentType = "application/json";
                    break;
                    case ".png":
                    ctx.Context.Response.ContentType = "image/png";
                    break;
                    case ".jpg":
                    ctx.Context.Response.ContentType = "image/jpeg";
                    break;
                    default:
                    ctx.Context.Response.ContentType = "application/octet-stream";
                    break;
                }
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
            FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Modules", "ApplicantTest", "wwwroot", "ProgramFiles", "Browser")),
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

