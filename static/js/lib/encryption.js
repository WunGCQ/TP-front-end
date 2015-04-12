function encryption(s) {
    var encry = hex_md5(s);
    return encry.substring(1,31);
}