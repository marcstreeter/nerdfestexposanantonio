serve:
  npm run dev

install:
  npm install

build:
  npm run build

uninstall:
  rm -rf node_modules && rm -rf ./.astro

reinstall:
  uninstall install build
  echo "completely reinstalled"
