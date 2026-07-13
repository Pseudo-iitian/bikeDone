package com.bikedone.usermanagement;

import com.bikedone.usermanagement.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(JwtProperties.class)
public class UserManagementServiceApplication {

	public static void main(String[] args) {
		// codex resume 019f55e9-d49d-71d1-a752-d60a6d6c158d
		SpringApplication.run(UserManagementServiceApplication.class, args);
	}
}