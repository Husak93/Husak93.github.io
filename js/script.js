//init materilize
$(document).ready(function() {
    $('select').material_select();
});
new WOW().init();
// creat table
function createTable(n) {
    var r, c;
    var d1 = 10,
        d2 = 11;
    for (var i = 0; i < n; i++) {
        $('#game tbody').append('<tr id=' + 'row_' + i + '></tr>');
        for (var j = 0; j < n; j++) {
            r = i;
            c = n + j;
            var indexes = [r, c];
            if (i == j) {
                indexes.push(d1);
            }
            if (i + j == n - 1) {
                indexes.push(d2);
            }
            $('#game tbody').find('#row_' + i + '').append('<td data-affected-indexes=' + indexes + '></td>');
        }
    }
    $('#game tbody').prepend("<div class='win-overlay'></div>");
}
createTable(5);


// function of play-game
(function() {
    //variables
    var table = $('table#game'),
        td = table.find('td'),
        td_length = table.find('td').length,
        player = 1,
        computer_draw = 2,
        winPositionsComp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        winPositionsPlayer1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        winPositionsPlayer2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        random = Math.floor(Math.random() * td_length);

    $(document).ready(function() {
        var number = 1;


        // choose type of game
        $('.dropdown-content li').each(function() {
            $(this).click(function(e) {
                if ($(this).text() == 'Computer') {
                    console.log('Your coise computer');
                    $('.player-move').show();
                    table.fadeIn();
                    startGameWithComputer();
                    $('#type-of-game').fadeOut();
                } else {
                    console.log('Start game with player 2');
                    $('.player-move').show();
                    table.fadeIn();
                    startGameWithPlayer();
                    $('#type-of-game').fadeOut();
                }
            })
        })
    });
    // start game with second player
    function startGameWithPlayer() {
        td.click(function(e) {
            current_cell = $(this);
            if (!1) {
                console.log('won');
            } else {
                if (player == 1) {

                    if (!$(this).hasClass('cross') && !$(this).hasClass('circle')) {
                        current_cell.addClass(currentPlayerPattern(player));
                        moveTurn(player + 1);
                        if (checkIfWon(current_cell, winPositionsPlayer1) == true) {
                            $('.win-overlay').show();
                            $('body').find('.win-overlay').append("<h1>" + "Player " + player + " WON </h1>");
                            $('#reset').css('display', 'block');
                        }
                    } else {
                        player -= 1;
                        alert('Cell is Completed');
                    }
                } else {
                    if (!$(this).hasClass('cross') && !$(this).hasClass('circle')) {
                        current_cell.addClass(currentPlayerPattern(player));
                        moveTurn(player - 1);
                        if (checkIfWon(current_cell, winPositionsPlayer2) == true) {
                            $('.win-overlay').show();
                            $('body').find('.win-overlay').append("<h1>" + "Player " + player + " WON </h1>");
                            $('#reset').css('display', 'block');
                        }
                    } else {
                        alert('Cell is Completed');
                        player -= 1;
                    }

                }
                player = setNextPlayer(player);
            }
        });
        resetGame();
    }

    // start game with computer
    function startGameWithComputer() {
        td.mousedown(function(e) {
            current_cell = $(this);
            if (!1) {
                console.log('won');
            } else {
                if (player == 1) {
                    if (!$(this).hasClass('cross') && !$(this).hasClass('circle')) {
                        current_cell.addClass(currentPlayerPattern(player));
                        if (checkIfWon(current_cell, winPositionsPlayer1) == true) {
                            $('.win-overlay').show();
                            $('body').find('.win-overlay').append("<h1>" + "Player " + player + " WON </h1>");
                            $('#reset').css('display', 'block');
                        }
                    } else {
                        alert('Cell is Completed');
                        return;
                    }
                }
                computerStep(current_cell, computer_draw);
            }
        });
        resetGame();
    }

    // reload game, start new
    function resetGame() {
        $('#reset').click(function() {
            table.fadeOut();
            td.each(function() {
                $(this).removeClass('circle')
            });
            setTimeout(function() {
                location.reload();
            }, 800)
        })
    }
    // toggle players pattern
    function currentPlayerPattern(player) {
        if (player == 1) {
            return 'cross';
        } else {
            return 'circle';
        }
    }
    // toggle players turn
    function setNextPlayer(player) {
        if (player == 1) {
            return player = 2;
        } else {
            return player = 1;
        }
    }
    // function of computer step
    function computerStep(playerClick, computer_draw) {
        random = Math.floor(Math.random() * td_length);
        var computerClick = $(td[random]);
        console.log(winPositionsComp);
        if (computerClick.hasClass('cross') || computerClick.hasClass('circle')) {
            computerStep();
        } else {
            $(td[random]).trigger('click').addClass(currentPlayerPattern(computer_draw));
            if (checkIfWon(computerClick, winPositionsComp) == true) {
                $('.win-overlay').show();
                $('body').find('.win-overlay').append("<h1>Computer WON</h1>");
                $('#reset').css('display', 'block');
            }
        }
    }
    // check when someone wins
    function checkIfWon(data, winPositions) {

        var data_array = $(data).data("affectedIndexes").split(',');

        for (var i = 0; i < data_array.length; i += 1) {
            winPositions[parseFloat(data_array[i])] += 1;
            if (winPositions[parseFloat(data_array[i])] == 5) {
                return true
            }
        }
        return false;
    }

    function moveTurn(player) {
        if(player == 1){
            $('.player-move').html("<h5>Your move: player" + player + " (cross)" + "</h5>");
        }
        if(player == 2){
            $('.player-move').html("<h5>Your move: player" + player + " (circle)" +"</h5>");
        }
    }
})();