package com.project.Book.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookInListResponse {
    Integer bookId;
    String bookCode;
    String bookTitle;
    String authors;
    String bookImg;
    List<String> cateNames;
    Integer quantityAvailable;
}
