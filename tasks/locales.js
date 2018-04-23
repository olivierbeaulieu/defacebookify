import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './lib/args';

gulp.task('locales', () => gulp.src('app/_locales/**/*.json')
  .pipe(gulp.dest(`dist/${args.vendor}/_locales`))
  .pipe(gulpif(args.watch, livereload())));
