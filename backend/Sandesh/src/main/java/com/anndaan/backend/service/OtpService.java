package com.anndaan.backend.service;

import org.springframework.stereotype.Service;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;


@Service
public class OtpService {

    private static final Integer EXPIRE_MINS = 5; // OTP expiry time
    private LoadingCache<String, String> otpCache;

    public OtpService() {
        super();
        otpCache = CacheBuilder.newBuilder()
                .expireAfterWrite(EXPIRE_MINS, TimeUnit.MINUTES)
                .build(new CacheLoader<String, String>() {
                    public String load(String key) {
                        return null; // Important: Return null if key is not found
                    }
                });
    }

    public String generateOtp(String phoneOrEmail) {
        Random random = new Random();
        String otp = String.format("%06d", random.nextInt(999999));
        otpCache.put(phoneOrEmail, otp);
        return otp;
    }

    public boolean verifyOtp(String phoneOrEmail, String otp) {
        try {
            String storedOtp = otpCache.getIfPresent(phoneOrEmail);
            if (storedOtp != null && storedOtp.equals(otp)) {
                otpCache.invalidate(phoneOrEmail); // OTP is used, invalidate it
                return true;
            }
        } catch (Exception e) {
            // Log error or handle appropriately
            // Consider logging e.getMessage() or e.printStackTrace()
            return false;
        }
        return false;
    }
} 