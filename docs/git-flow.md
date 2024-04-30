# Git Flow

## Sprint 1
1. От ветки `main` создается ветка `develop`.
2. В ветки `main` и `develop` нельзя делать `commit` напрямую.
3. Для каждой задачи создается своя ветка от ветки `develop` с названием типа, номера и названия задачи:
`feat/RSS-ECOMM-1_08_configureBundler`
`fix/RSS-ECOMM-1_08_fixProductionBuildMode`
4. Примеры написания коммитов:
`docs: update readme with additional information about project`
`feat: add .gitignore`
5. После окончания работы над задачей создается `Pull Request`, добавляются `Reviewers` для проверки кода. Выполнить `Squash and merge` ветки задачи с веткой `develop` можно только после `Code Review` двух участников команды.
6. Пример написания Pull Request:
`Docs: RSS-ECOMM-1_01: Set up GitHub repository`
`Feat: RSS-ECOMM-1-21: Create Pull Request Template`
7. В конце `Sprint 1` создается `Pull Request` из ветки `develop` в ветку `main`. Этот `Pull Request` проверяет ментор. Ссылку на проверку ментору должен засабмитить каждый участник команды.

## Sprint 2
8. Для `Sprint 2` создается новая ветка от ветки `develop` с названием `release/login-registration-main`.
9. Для каждой задачи создается своя ветка от ветки `release/login-registration-main` с названием типа, номера и названия задачи по аналогии с пунктом 3.
10. После окончания работы над задачей создается `Pull Request`, добавляются `Reviewers` для проверки кода. Делать `Squash and merge` ветки задачи с веткой `release/login-registration-main` можно только после `Code Review` двух участников команды.
11. После проверки кода необходимо выполнить `Squash and merge` ветки задачи с текущей веткой `release/login-registration-main`.
12. В конце спринта создается `Pull Request` из текущей ветки спринта  `release/login-registration-main` в ветку `develop`.
13. После того, как `Pull Request` будет рассмотрен и одобрен, необходимо сделать `Squash and merge` ветки `release/login-registration-main` в ветку `develop`.
14. После окончания спринта созданный и замерженный в пункте 13 `Pull Request` проверяет ментор. Ссылку на проверку ментору должен засабмитить каждый участник команды.
15. Из ветки `develop` делается `build` проекта и заливается на `gh-pages`. Ссылку на кросс-чек сабмитит один участник команды.

## Sprint 3
16. Для `Sprint 3` создается новая ветка `release/catalog-product-profile` от ветки `develop`.
17. Для каждой задачи создается своя ветка от ветки `release/catalog-product-profile` с названием типа, номера и названия задачи по аналогии с пунктом 3.
18. После окончания работы над задачей создается `Pull Request`, добавляются `Reviewers` для проверки кода. Делать `Squash and merge` ветки задачи с веткой `release/catalog-product-profile` можно только после `Code Review` двух участников команды.
19. После проверки кода необходимо выполнить `Squash and merge` ветки задачи с текущей веткой `release/catalog-product-profile`.
20. В конце спринта создается `Pull Request` из текущей ветки спринта  `release/catalog-product-profile` в ветку `develop`.
21. После того, как `Pull Request` будет рассмотрен и одобрен, необходимо сделать `Squash and merge` ветки `release/catalog-product-profile` в ветку  `develop`.
22. После окончания спринта созданный и замерженный в пункте 21 `Pull Request` проверяет ментор. Ссылку на проверку ментору должен засабмитить каждый участник команды.
23. Из ветки `develop` делается `build` проекта и заливается на `gh-pages`. Ссылку на кросс-чек сабмитит один участник команды.

## Sprint 4
24. Для `Sprint 4` создается новая ветка `release/basket-about_us` от ветки `develop`.
25. Для каждой задачи создается своя ветка от ветки `release/basket-about_us` с названием типа, номера и названия задачи по аналогии с пунктом 3.
26. После окончания работы над задачей создается `Pull Request`, добавляются `Reviewers` для проверки кода. Делать `Squash and merge` ветки задачи с веткой `release/basket-about_us` можно только после `Code Review` двух участников команды.
27. После проверки кода необходимо выполнить `Squash and merge` ветки задачи с текущей веткой `release/basket-about_us`.
28. В конце спринта создается `Pull Request` из текущей ветки спринта  `release/basket-about_us` в ветку `develop`.
29. После того, как `Pull Request` будет рассмотрен и одобрен, необходимо сделать `Squash and merge` ветки `release/basket-about_us` в ветку  `develop`.
30. После окончания спринта созданный и замерженный в пункте 29 `Pull Request` проверяет ментор. Ссылку на проверку ментору должен засабмитить каждый участник команды.
31. Из ветки `develop` делается `build` проекта и заливается на `gh-pages`. Ссылку на кросс-чек сабмитит один участник команды.

### Notes
1. В случае, если нужно добавить функционал, которого нет в списке задач текущего спринта, то в данном спринте находим последний номер задачи, например, это `RSS-ECOMM-1_21: Create a pull request template`. Создаем новую задачу в `Github Projects` со следующим по счету номером `RSS-ECOMM-1_22: Create Style Guide and Git Flow`. Создаем новую ветку от текущей ветки разработки с названием  `docs/RSS-ECOMM-1_22_createStyleGuideAndGitFlow`, добавляем весь функционал и затем создаем `Pull Request` по аналогии с предыдущими задачами, дожидаемся ревью и мержим в ветку разработки.

