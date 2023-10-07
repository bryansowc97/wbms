
 @Configuration
 public class CorsConfig {
   @Bean
   public WebMvcConfingurer corsConfigurer() {
     return new WebMvcConfigurer() {
       @Override
       public void addCorsMappings(CorsRegistry registry) {
          registry.addMapping("/api/**") // Define the path(s) you want to allow CORS for
           .allowedOrigins("http://localhost:4200") // Specify the allowed origins
           .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify the allowed HTTP methods
           .allowCredentials(true); // Allow credentials (cookies) to be sent cross-origin if needed
       }
     }
   }
 }
