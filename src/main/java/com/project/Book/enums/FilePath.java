package com.project.Book.enums;

import lombok.Getter;

@Getter
public enum FilePath {
    BOOK_IMG("src/main/resources/static/images/"),
    CATE_IMG("src/main/resources/static/images/");
    private final String imgPath;
    FilePath(String imgPath) {this.imgPath = imgPath;}
}
