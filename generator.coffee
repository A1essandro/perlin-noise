class PerlinNoiseGenerator

    terra: null
    size: 0
    persistence: 0

    generate: (size, persistence) ->
        @size = size
        @persistence = persistence
        octaves = Math.log(size, 2)

        for x in [0..size]
            for y in [0..size]
                @terra[x][y] = Math.random()

        for octave in [0..octaves]
            @octave(octave)

    octave: (octaveN) ->
        freq = Math.pow(2, octaveN)
        $amp = Math.pow(@persistence, octaveN)

        n = m = freq + 1

        arr = []
        for j in [0..m]
            for i in [0..n]
                arr[j][i] = Math.random * amp

        nx = @size / (n - 1)
        ny = @size / (m - 1)

        for ky in [0..@size]
            for kx in [0..@size]
                i = parseInt(kx / nx)
                j = parseInt(ky / ny)

                dx0 = kx - i * nx;
                dx1 = nx - dx0;
                dy0 = ky - j * ny;
                dy1 = ny - dy0;

                z = (arr[j][i] * dx1 * dy1 + arr[j][i + 1] * dx0 * dy1 + arr[j + 1][i] * dx1 * dy0 + arr[j + 1][i + 1] * dx0 * dy0) / (nx * ny)

                @terra[ky][kx] += z