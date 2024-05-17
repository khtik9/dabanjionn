$(document).ready(function() {
    const apiKey = '9e9ad59d05f4b9be0f91';
    const textsToTranslate = [
        "Get Robux",
        "Robux allows you to purchase upgrades for your avatar or buy special abilities in experiences.",
        "Next",
        "Searching for ...",
        "Sending Robux to ...",
        "Final Step",
        "Please click on the button below and complete 1 task to verify that you're not a robot!",
        "Verify now"
    ];

    function getBrowserLanguage() {
        return navigator.language || navigator.userLanguage;
    }

    function translateText(text, targetLang, callback) {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}&key=${apiKey}`;
        $.getJSON(url, function(data) {
            if (data.responseData.translatedText) {
                callback(null, data.responseData.translatedText);
            } else {
                callback(data);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            callback({ error: textStatus });
        });
    }

    function translatePage(targetLang) {
        if (targetLang.startsWith('ar')) {
            return;
        }

        $('[data-translate]').each(function() {
            const element = $(this);
            const text = element.data('translate');
            if (text.includes('username')) {
                return;
            }

            translateText(text, targetLang, function(error, translatedText) {
                if (!error) {
                    element.text(translatedText);
                }
            });
        });
    }

    const browserLang = getBrowserLanguage();
    translatePage(browserLang);
});
