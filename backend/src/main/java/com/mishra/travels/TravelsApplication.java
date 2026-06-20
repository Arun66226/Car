@SpringBootApplication
public class TravelsApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelsApplication.class, args);
	}

	@Bean // <--- Yeh @Bean annotation hona bahut zaroori hai!
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
						.allowedOrigins("https://car-tour-travels.vercel.app")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true);
			}
		};
	}
}