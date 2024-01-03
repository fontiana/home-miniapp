module.exports = async (targetOptions, indexHtmlContent) => {
    indexHtmlContent = indexHtmlContent.replaceAll("type=\"module\"",
        "crossorigin=\"use-credentials\" defer");
    return indexHtmlContent;
}