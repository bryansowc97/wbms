package wbms.com.sg.booking;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Define the path(s) you want to allow CORS for
          .allowedOrigins("http://localhost:4200") // Specify the allowed origins
          .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify the allowed HTTP methods
          .allowCredentials(true); // Allow credentials (cookies) to be sent cross-origin if needed
      }
    };
  }
}

