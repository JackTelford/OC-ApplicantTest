var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOrchardCms();
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseOrchardCore();
app.Run();