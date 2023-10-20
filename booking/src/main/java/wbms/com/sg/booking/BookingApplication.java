package wbms.com.sg.booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class BookingApplication {

  @Bean
  @LoadBalanced
  public RestTemplate restTemplate(RestTemplateBuilder builder) {
    return builder.build();
  }

	public static void main(String[] args) {
		SpringApplication.run(BookingApplication.class, args);
	}

}
