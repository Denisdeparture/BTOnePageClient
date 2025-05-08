using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using JavaScriptEngineSwitcher.V8;

namespace App
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();
            builder.Services.AddJsEngineSwitcher(options =>
            {
                options.AllowCurrentProperty = false;
                options.DefaultEngineName = V8JsEngine.EngineName;
            }).AddV8();
            builder.Services.AddWebOptimizer(pipeline =>
            {
              
                pipeline.CompileScssFiles();
            });
            var app = builder.Build();

            if (!app.Environment.IsDevelopment())
            {
                app.UseHsts();
            }
            app.UseWebOptimizer();

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseDefaultFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}");

         
            app.Run();
        }
    }
}
