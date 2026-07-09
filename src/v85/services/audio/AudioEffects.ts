export const sleep = (
  ms: number
) =>
  new Promise<void>(
    resolve =>
      setTimeout(
        resolve,
        ms
      )
  );

export async function fadeVolume(
  setter: (
    value: number
  ) => Promise<void>,
  from: number,
  to: number,
  duration = 500,
  steps = 20
) {

  const delta =
    (to - from) / steps;

  for (
    let i = 0;
    i <= steps;
    i++
  ) {

    await setter(
      from + delta * i
    );

    await sleep(
      duration / steps
    );

  }

}