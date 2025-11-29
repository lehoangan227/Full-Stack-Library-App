package com.project.Book.util;

import com.project.Book.enums.FilePath;
import com.project.Book.exception.AppException;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UtilClass {
    public static List<Sort.Order> getOrders(List<String> sorts){
        List<Sort.Order> orders = new ArrayList<>();
        if(sorts!=null&&!sorts.isEmpty()){
            for(String sortBy: sorts){
                Pattern pattern = Pattern.compile("(\\w+?)(:)(.*)");
                Matcher matcher = pattern.matcher(sortBy);
                if(matcher.find()){
                    if(matcher.group(3).equalsIgnoreCase("asc")){
                        orders.add(new Sort.Order(Sort.Direction.ASC, matcher.group(1)));
                    }
                    if(matcher.group(3).equalsIgnoreCase("desc")){
                        orders.add(new Sort.Order(Sort.Direction.DESC, matcher.group(1)));
                    }
                }
            }
        }
        return orders;
    }
    public static String hashPassword(String password){
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        return passwordEncoder.encode(password);
    }

    public static String getUserId() {
        Jwt jwt = getCurrentJwt();
        return Long.toString(jwt.getClaim("user_id"));
    }

    public static Jwt getCurrentJwt() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof Jwt) {
            return (Jwt) authentication.getPrincipal();
        }
        throw new RuntimeException("No JWT found in security context");
    }

    public static String saveImgAndGetImgPath(MultipartFile file, String dirPath){
        try {
            String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmmss-"));
            String fileName = date + file.getOriginalFilename();
            Path uploadPath = Paths.get(dirPath);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING // Ghi đè nếu đã tồn tại
            );
            return "/images/" + fileName;
        }catch (IOException e) {
            throw new AppException("error.img.notfound", HttpStatus.NOT_FOUND);
        }
    }
}
