// import cn from 'classnames'
// import styles from './Text.module.css'
import { ComponentPropsWithoutRef } from 'react'

interface ITextProps extends ComponentPropsWithoutRef<'span'> {
  as?:
    | 'b'
    | 'i'
    | 'u'
    | 'abbr'
    | 'cite'
    | 'del'
    | 'em'
    | 'ins'
    | 'kbd'
    | 'mark'
    | 's'
    | 'samp'
    | 'sub'
    | 'sup'
    | 'span'
  // size: '6xl' | '5xl' | '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
}

export function Text({ as: As, /* size, */ ...props }: ITextProps) {
  const Element = As
  /*
  const textClassName = cn(
    {
      [styles.xs]: size === 'xs',
      [styles.sm]: size === 'sm',
      [styles.md]: size === 'md',
      [styles.lg]: size === 'lg',
      [styles.xl]: size === 'xl',
      [styles.xl2]: size === '2xl',
      [styles.xl3]: size === '3xl',
      [styles.xl4]: size === '4xl',
      [styles.xl5]: size === '5xl',
      [styles.xl6]: size === '6xl',
    },
    className
  )
*/
  if (Element) {
    return <Element /* className={textClassName} */ {...props} />
  }
  return <p /* className={textClassName} */ {...props} />
}
