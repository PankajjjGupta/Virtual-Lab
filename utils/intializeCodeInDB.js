module.exports = function (languagevalue) {
    console.log(languagevalue);
    if(languagevalue == "62") {
        return `public class Main {\npublic static void main(String args[]) {\n  System.out.print("Hello World From Java!");\n}\n}`;
    }else if(languagevalue == "70") {
        return `print("Hello World From Python!")`;
    }else if(languagevalue == "54") {
        return `#include <iostream>\nint main() {\n    std::cout << "Hello World!";\n    return 0;\n}\n`
    }else if(languagevalue == "75") {
        return `#include <stdio.h>\nint main() {\n   printf("Hello, World!");\n   return 0;\n}\n`
    }
}