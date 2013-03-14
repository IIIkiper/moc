package ru.ibs.moc.service;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@PropertySource("classpath:ru/ibs/moc/service/data.properties")
public class DataCfg {	
	@Value("${jdbc.url}") private String url;
	@Value("${jdbc.driver}") private String driver;
	
	@Value("${jdbc.username}") private String username;
	@Value("${jdbc.password}") private String password;
	
	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource dmds = new DriverManagerDataSource();
		dmds.setDriverClassName(driver);
		dmds.setUrl(url);
		dmds.setUsername(username);
		dmds.setPassword(password);		
		return dmds;
	}
	
	@Bean
	public JdbcTemplate jdbcTemplate() {
		return new JdbcTemplate(dataSource());
	}
	
	@Bean
	public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
	    return new PropertySourcesPlaceholderConfigurer();
	}
}