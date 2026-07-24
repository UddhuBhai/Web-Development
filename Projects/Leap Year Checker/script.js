const result = document.getElementById("result");

function judgeYear() {

    const year = Number(document.getElementById("year").value);

    if (!year) {

        result.innerHTML = `
            <p>Please write a valid year.</p>
        `;

        return;
    }

    result.innerHTML = `
        <p>"I'll take a potato chip..."</p>
    `;

    setTimeout(() => {

        result.innerHTML = `
            <p>"...and eat it."</p>
        `;

    }, 900);

    setTimeout(() => {

        let leap =
            year % 400 === 0 ||
            (year % 4 === 0 && year % 100 !== 0);

        if (leap) {

            result.innerHTML = `
                <h3>VERDICT</h3>

                <p class="verdict alive">
                    THIS YEAR SHALL LIVE.
                </p>

                <small>Leap Year</small>

                <p style="margin-top:15px;">
                    Justice has spoken.
                </p>
            `;

        } else {

            result.innerHTML = `
                <h3>VERDICT</h3>

                <p class="verdict dead">
                    THIS YEAR HAS BEEN ERASED.
                </p>

                <small>Not a Leap Year</small>

                <p style="margin-top:15px;">
                    Justice has spoken.
                </p>
            `;

        }

    }, 1800);

}