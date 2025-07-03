package com.codersinfinity.anndaan.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}") // Or use a fixed 'from' address if configured
    private String fromEmailAddress;

    public void sendOtpEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmailAddress);
            message.setTo(toEmail);
            message.setSubject("Your OTP for AnnDaan Registration");
            message.setText("Your OTP is: " + otp + "\n\nThis OTP is valid for 5 minutes.");
            
            mailSender.send(message);
            logger.info("OTP email sent successfully to {}", toEmail);
        } catch (MailException e) {
            logger.error("Failed to send OTP email to {}: {}", toEmail, e.getMessage());
            // Optionally, rethrow a custom exception or handle accordingly
            // throw new RuntimeException("Failed to send OTP email: " + e.getMessage(), e);
        }
    }
} 