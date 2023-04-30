// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}

function generateAllEmojiCodes() {
    const result = [];
    const emojiRange = [
        [0x261D, 0x261D],
        [0x270A, 0x270D],
        [0x1F300, 0x1F320],
        [0x1F324, 0x1F4FF],
        [0x1F500, 0x1F53D],
        [0x1F549, 0x1F579],
        [0x1F57A, 0x1F57A],
        [0x1F590, 0x1F590],
        [0x1F595, 0x1F596],
        [0x1f600, 0x1F6D2],
        [0x1F910, 0x1F94C],
        [0x1F950, 0x1F9E6],
    ];

    for (let i = 0; i < emojiRange.length; i++) {
        const range = emojiRange[i];
        for (let x = range[0]; x < range[1]; x++) {
            result.push(x);
        }
    }
    return result;
}

const btnShare = document.getElementById('btn-share');
btnShare.addEventListener('click', () => {
    if(!navigator['share']) return;
    navigator.share({
        'title': 'The catch-title-share-text, to be done.',
        'text': 'Optional message',
        'url': `https://a13ks3y.github.io/emoji-story-coubes/index.html#todo`
    }).then(() => {
        console.log('Successful share!');
    }).catch(error => {
        console.error('Error sharing:', error)
    });
});

const $qubes = [
    1,2,3,4,5,6,7,8,9
].map(n => document.getElementById(`qube-${n}`));
const ROUNDS = 9;
function shuffle() {
    const VALUES = generateAllEmojiCodes();
    for (let i = 1; i <= ROUNDS; i++) {
        setTimeout(() => {
            $qubes.forEach($qube => {
                const code = VALUES.splice(Math.floor(Math.random() * VALUES.length), 1)[0];
                $qube.innerHTML = `&#${code};`;
            });
        }, i * 666);
    }
}
const tapArea = document.getElementById('tap-area');
tapArea.addEventListener('click', shuffle);
tapArea.addEventListener('touchend', shuffle);
// @todo: check url, and if hash value is set, use it
shuffle();
