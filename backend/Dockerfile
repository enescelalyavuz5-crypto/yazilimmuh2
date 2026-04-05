# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build-env
WORKDIR /app

# Copy the csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the files and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview
WORKDIR /app
COPY --from=build-env /app/out .

# Expose port (Render defaults to 10000 or reads the PORT env variable)
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

# Entrypoint
ENTRYPOINT ["dotnet", "backend.dll"]
